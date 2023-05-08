import SegmentTreeNode from "./model/segment-tree-node.js";

class TreeVisualizer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://unpkg.com/chota@latest');
                /* Add any additional component styles here */
            </style>
            <div id="tree-container">
                <!-- The tree will be rendered here -->
            </div>
            <button id="add-child-segment" class="button">Add Child Segment</button>
        `;

        this.segmentsTree = new SegmentTreeNode(0, 0, null);

        this.currentSegment = this.segmentsTree;

        this.renderTree = this.renderTree.bind(this);
        this.handleAddChildSegment = this.handleAddChildSegment.bind(this);
        this.handleSegmentClick = this.handleSegmentClick.bind(this);

        this.shadowRoot.querySelector('#add-child-segment').addEventListener('click', this.handleAddChildSegment);
    }

    // Method to render the tree
    renderTree(node = this.segmentsTree, parentElement = this.shadowRoot.querySelector('#tree-container'), isRoot = true) {
        // Create a div for the current node
        const nodeDiv = document.createElement('div');
        nodeDiv.classList.add('segment-node');

        if (!isRoot) {
            nodeDiv.textContent = `Segment ${node.id} (${node.start.toFixed(2)}s - ${node.end.toFixed(2)}s)`;
            nodeDiv.dataset.id = node.id;
            nodeDiv.style.width = `${((node.end - node.start) / (this.segmentsTree.end - this.segmentsTree.start)) * 100}%`;

            // Add a class to leaf nodes
            if (node.children.length === 0) {
                nodeDiv.classList.add('leaf-node');
            }

            nodeDiv.addEventListener('click', this.handleSegmentClick);
        }

        // Append the current node div to the parent element
        parentElement.appendChild(nodeDiv);

        // Create a container for the children of the current node
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('children-container');

        // Iterate through the children and render their subtrees
        for (const child of node.children) {
            this.renderTree(child, childrenContainer, false);
        }

        // Append the children container to the parent element
        parentElement.appendChild(childrenContainer);
    }

    // Method to handle adding child segments
    handleAddChildSegment() {
        // Implement child segment creation logic here
        this.dispatchEvent(new CustomEvent('request-video-time', { bubbles: true, composed: true }));
    }

    addSegment(currentTime) {
        // Get the current segment node from the tree using the currentSegmentId
        const currentSegment = this.segmentsTree.findNodeById(this.currentSegmentId);

        if (!currentSegment) {
            return;
        }

        // If the current segment has no children, create two new child segments
        if (currentSegment.children.length === 0) {
            const child1 = new SegmentTreeNode(this.nextNodeId++, currentSegment.start, currentTime, currentSegment);
            const child2 = new SegmentTreeNode(this.nextNodeId++, currentTime, currentSegment.end, currentSegment);
            currentSegment.addChild(child1);
            currentSegment.addChild(child2);
        } else {
            // If the current segment has children, split the child segment that includes the current video time
            for (const child of currentSegment.children) {
                if (currentTime >= child.start && currentTime <= child.end) {
                    const newChild = new SegmentTreeNode(this.nextNodeId++, currentTime, child.end, currentSegment);
                    child.end = currentTime;
                    currentSegment.addChild(newChild);
                    break;
                }
            }
        }

        // Re-render the tree to display the updated structure
        this.renderTree();
    }

    // Method to handle segment click
    handleSegmentClick(event) {
        // Implement segment selection logic here
    }
}

customElements.define('tree-visualizer', TreeVisualizer);
