class SegmentTreeNode {
    constructor(id, start, end, parent = null) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.parent = parent;
        this.children = [];
    }

    // Method to add a child node
    addChild(node) {
        this.children.push(node);
    }

    // Method to remove a child node
    removeChild(node) {
        const index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    // Method to find a node by its ID
    findNodeById(id) {
        if (this.id === id) {
            return this;
        }

        for (const child of this.children) {
            const foundNode = child.findNodeById(id);
            if (foundNode) {
                return foundNode;
            }
        }

        return null;
    }
}

export default SegmentTreeNode;
