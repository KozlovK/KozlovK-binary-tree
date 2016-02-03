'use strict';

class BinaryTree {

	
	constructor() {
		this.root = null;
	}

	insert(data) {
		var newNode = new Node(data, null, null)
		if (this.root == null){
			this.root = newNode
		} else {
			this.insertNode(newNode)
		} 
	}
	
	insertNode(node) {
		if (node == null){
			return
		}
		
		var currNode = this.root
		while(true){
			if (currNode.data == node.data) {
				return
			} 
			if (currNode.data > node.data) {
				if (currNode.left == null) {
					currNode.left = node
					break
				} else {
					currNode = currNode.left
				}
			} else {
				if (currNode.right == null) {
					currNode.right = node
					break
				} else {
					currNode = currNode.right
				}
			}
		}
	}

	contains(data) {
		if (this.root == null){
			return null
		} else {
			var currNode = this.root
			while(true){
				if(currNode.data == data) {
					return true
				} else if (currNode.data > data) {
					if (currNode.left == null) {
						return false
					} else {
						currNode = currNode.left
					}
				} else if (currNode.data < data){
					if (currNode.right == null) {
						return false
					} else {
						currNode = currNode.right
					}
				}
			}
		}
	}

	remove(data) {
		if (this.root != null){		
			if (this.root.data == data){
				var leftIsDeeper = this.getNodeSize(this.root.left) > this.getNodeSize(this.root.right)
				var reinsertedChild = leftIsDeeper ? this.root.right : this.root.left
				this.root = leftIsDeeper ? this.root.left : this.root.right
				this.insertNode(reinsertedChild)
			} else {
				var parentNode = null
				var currNode = this.root
				while (true) {
					if(currNode.data == data) {
						var leftIsDeeper = this.getNodeSize(currNode.left) > this.getNodeSize(currNode.right)
						var reinsertedChild = leftIsDeeper ? currNode.right : currNode.left			
						if ( parentNode.data > currNode.data){
							parentNode.left = leftIsDeeper ? currNode.left : currNode.right
						} else {
							parentNode.right = leftIsDeeper ? currNode.left : currNode.right
						}
						this.insertNode(reinsertedChild)

						break 
					} else if (currNode.data > data) {
						if (currNode.left == null) {
							break 
						} else {
							parentNode = currNode
							currNode = currNode.left
						}
					} else if (currNode.data < data){
						if (currNode.right == null) {
							break 
						} else {
							parentNode = currNode
							currNode = currNode.right
						}
					}										
				}
			}
		}
	}

	size() {
		return this.root == null ? 0 : this.getNodeSize(this.root)
	}

	getNodeSize(node) {
		return (node == null) ? 0 : 1 + this.getNodeSize(node.left) + this.getNodeSize(node.right)
	}
	
	isEmpty() {
		return this.root == null
	}
}
