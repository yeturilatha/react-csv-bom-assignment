import { useState } from "react";
import "./TreeTable.css";

function Row({ node, level }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <tr>
        {/* Category / Item */}
        <td>
          <div
            className="tree-cell"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {hasChildren && (
              <span className="arrow" onClick={() => setOpen(!open)}>
                {open ? "▾" : "▸"}
              </span>
            )}
            <span>{node.name}</span>
          </div>
        </td>

        {/* Est Rate */}
        <td className="right">
          {node.rate ? `$${node.rate.toFixed(2)}` : ""}
        </td>

        {/* Qty */}
        <td className="right">
          {node.qty ?? ""}
        </td>
      </tr>

      {open &&
        hasChildren &&
        node.children.map((child, idx) => (
          <Row key={idx} node={child} level={level + 1} />
        ))}
    </>
  );
}

export default function TreeTable() {
  const data = [
    {
      name: "Aerospace Parts",
      rate: 812.5,
      qty: 605,
      children: [
        {
          name: "Structural",
          rate: 185,
          qty: 40,
          children: [
            {
              name: "Support strut for seat mounting",
              rate: 185,
              qty: 40,
            },
          ],
        },
        {
          name: "Brackets",
          rate: 125,
          qty: 60,
          children: [
            {
              name: "Titanium mounting bracket",
              rate: 125,
              qty: 60,
            },
          ],
        },
        {
          name: "Rods",
          rate: 125,
          qty: 35,
          children: [
            {
              name: "Titanium pushrod threaded both ends",
              rate: 125,
              qty: 35,
            },
          ],
        },
        {
          name: "Clips",
          rate: 4.5,
          qty: 300,
          children: [
            {
              name: "Cable support P-clip",
              rate: 4.5,
              qty: 300,
            },
          ],
        },
        {
          name: "Plates",
          rate: 95,
          qty: 30,
          children: [
            {
              name: "Reinforcement plate drilled",
              rate: 95,
              qty: 30,
            },
          ],
        },
        {
          name: "Lugs",
          rate: 85,
          qty: 40,
          children: [
            {
              name: "Clevis lug forged",
              rate: 85,
              qty: 40,
            },
          ],
        },
        {
          name: "Channels",
          rate: 165,
          qty: 20,
          children: [
            {
              name: "Structural channel section",
              rate: 165,
              qty: 20,
            },
          ],
        },
        {
          name: "Terminals",
          rate: 28,
          qty: 80,
          children: [
            {
              name: "Electrical bus bar terminal",
              rate: 28,
              qty: 80,
            },
          ],
        },
      ],
    },
    {
      name: "Precision Components",
      rate: 638.25,
      qty: 930,
      children: [
        {
          name: "Fasteners",
          rate: 8.5,
          qty: 500,
          children: [
            {
              name: "Titanium aerospace bolt",
              rate: 8.5,
              qty: 500,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="tree-wrapper">
      <h2>Hierarchical Supplier Table</h2>

      <table className="tree-table">
        <thead>
          <tr>
            <th>Category / Item</th>
            <th className="right">Est. Rate</th>
            <th className="right">Qty</th>
          </tr>
        </thead>

        <tbody>
          {data.map((node, i) => (
            <Row key={i} node={node} level={0} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
