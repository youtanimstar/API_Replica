import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Menu({ apiId, title = "", description = "" }) {
    const [open, setOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const navigate = useNavigate();

    const menuRef = useRef(null);

    // Close menu on outside click
    useEffect(() => {
        if (!open) return;
        function handleClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const handleDelete = async () => {
        setShowDeleteModal(false);
    };

    const handleEdit = async () => {
        setShowEditModal(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen((v) => !v)}
                className="bg-transparent border-none cursor-pointer text-2xl"
                aria-label="Open menu"
                type="button"
            >
                ⋮
            </button>
            {open && (
                <div
                    ref={menuRef}
                    className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
                >
                    <div className="bg-white border border-gray-300 rounded shadow-lg min-w-[240px] w-full max-w-xs p-4">
                        <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                                setShowEditModal(true);
                                setEditTitle(title);
                                setEditDescription(description);
                                setOpen(false);
                            }}
                            type="button"
                        >
                            Edit
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                                setShowDeleteModal(true);
                                setOpen(false);
                            }}
                            type="button"
                        >
                            Delete
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                                navigate(`/details/${apiId}`);
                                setOpen(false);
                            }}
                            type="button"
                        >
                            Open
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
                        <p className="mb-4">Are you sure you want to delete?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                onClick={handleDelete}
                                type="button"
                            >
                                OK
                            </button>
                            <button
                                className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                                onClick={() => setShowDeleteModal(false)}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Edit Card</h3>
                        <input
                            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <textarea
                            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description"
                            rows={3}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                onClick={handleEdit}
                                type="button"
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                                onClick={() => setShowEditModal(false)}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;
