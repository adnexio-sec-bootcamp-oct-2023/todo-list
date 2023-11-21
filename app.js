document.addEventListener("DOMContentLoaded", function() {
    const items = document.getElementById("items");
    const submit = document.getElementById("submit");
    let editItem = null;

    document.querySelector("#addForm").addEventListener("submit", addItem);
    items.addEventListener("click", removeOrEditItem);

    function addItem(e) {
        e.preventDefault();
        const newItem = document.getElementById("item").value.trim();
        if (!newItem) return;

        if (submit.value === "EDIT") {
            editItem.target.parentNode.childNodes[0].data = newItem;
            resetInput();
            return;
        }
        createListItem(newItem);
        resetInput();
    }

    function createListItem(itemText) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        const deleteButton = createButton("Delete", "btn-danger", "delete");
        const editButton = createButton("Edit", "btn-success", "edit");
        li.appendChild(document.createTextNode(itemText));
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        items.appendChild(li);
    }

    function createButton(text, btnClass, btnType) {
        const button = document.createElement("button");
        button.className = `${btnClass} btn btn-sm float-right ${btnType}`;
        button.appendChild(document.createTextNode(text));
        return button;
    }

    function resetInput() {
        document.getElementById("item").value = "";
        submit.value = "Submit";
        editItem = null;
    }

    function removeOrEditItem(e) {
        if (e.target.classList.contains("delete")) {
            removeTask(e);
        } else if (e.target.classList.contains("edit")) {
            setupEdit(e);
        }
    }

    function removeTask(e) {
        if (confirm("Are you sure?")) {
            const li = e.target.parentNode;
            items.removeChild(li);
        }
    }

    function setupEdit(e) {
        document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
    }

    window.toggleButton = function(ref, btnID) {
        document.getElementById(btnID).disabled = false;
    }
});
