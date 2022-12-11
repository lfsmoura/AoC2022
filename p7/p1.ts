import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

type Tree = {
  name: string;
  children: Map<string, Tree> | null;
  parent: Tree | null;
  size?: number;
};

const Root: Tree = {
  name: "/",
  children: new Map(),
  parent: null,
};

let currentNode: Tree = Root;

rl.on("line", (input) => {
  if (input.startsWith("$ cd")) {
    const [_, _2, path] = input.split(" ").map((s) => s.trim());
    if (path === "..") {
      currentNode = currentNode.parent!;
    } else if (path !== "/") {
      currentNode = currentNode.children!.get(path)!;
    }
  } else if (input.startsWith("$ ls")) {
    // ignore?
  } else {
    if (input.startsWith("dir")) {
      const [_, name] = input.split(" ");
      if (!currentNode.children!.has(name)) {
        const node: Tree = {
          name,
          children: new Map(),
          parent: currentNode,
        };
        currentNode.children!.set(name, node);
      }
    } else {
      const [size, name] = input.split(" ");
      if (!currentNode.children!.has(name)) {
        const node: Tree = {
          name,
          children: null,
          parent: currentNode,
          size: parseInt(size),
        };
        currentNode.children!.set(name, node);
      }
    }
  }
});
rl.on("close", () => {
  let totalSize = 0;
  const getSize = (node: Tree): number => {
    if (node.children === null) {
      return node.size!;
    }
    let size = 0;
    for (const child of node.children.values()) {
      size += getSize(child);
    }
    if (size <= 100000) {
      totalSize += size;
    }
    return size;
  };

  getSize(Root);

  console.log("answer", totalSize);
});
