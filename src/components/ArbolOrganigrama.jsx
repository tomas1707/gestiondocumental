import React, { Component } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import "../styles/ArbolOrganigrama.css";
class ArbolOrganigrama extends Component {
  buildTree(areas) {
    const nodesByName = new Map();
    const childrenMap = new Map();

    areas.forEach((a) => {
      nodesByName.set(a.area, a);
      if (!childrenMap.has(a.area)) {
        childrenMap.set(a.area, []);
      }
    });

    const roots = [];

    areas.forEach((a) => {
      const sup = (a.superior || "").trim();
      if (!sup || sup === "-" || !nodesByName.has(sup)) {
        roots.push(a.area);
      } else {
        if (!childrenMap.has(sup)) {
          childrenMap.set(sup, []);
        }
        childrenMap.get(sup).push(a.area);
      }
    });

    return { roots, childrenMap };
  }

  renderNode(name, childrenMap) {
    const children = childrenMap.get(name) || [];

    return (
      <TreeNode key={name} label={<div className="org-node">{name}</div>}>
        {children.map((child) => this.renderNode(child, childrenMap))}
      </TreeNode>
    );
  }

  render() {
    const { areas } = this.props;
    const { roots, childrenMap } = this.buildTree(areas);

    if (roots.length === 0) return null;

    return (
      <div className="org-tree-wrapper">
        {roots.map((root) => (
          <Tree
            key={root}
            lineWidth={"2px"}
            lineColor={"#0d6efd"}
            lineBorderRadius={"10px"}
            label={<div className="org-node org-node-root">{root}</div>}
          >
            {(childrenMap.get(root) || []).map((child) =>
              this.renderNode(child, childrenMap)
            )}
          </Tree>
        ))}
      </div>
    );
  }
}

export default ArbolOrganigrama;
