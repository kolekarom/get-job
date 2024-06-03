import React, { useState } from "react";

const EditJobModal = ({ job, setEditModal, onEditJob }) => {
  const [editedJob, setEditedJob] = useState(job);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  const handleSaveChanges = () => {
    onEditJob(editedJob);
    setEditModal(false);
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  return (
    <div className="fixed inset-0 bg-[#000]/50 z-40 flex justify-center items-center">
      <div className="p-6 w-[70%] lg:w-[50%] shadow-md bg-[#f3f3f3] rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="jobTitle"
              value={editedJob.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            />
            <input
              type="text"
              name="companyName"
              value={editedJob.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            />
            <input
              type="date"
              name="applicationDate"
              value={editedJob.applicationDate}
              onChange={handleInputChange}
              placeholder="Application Date"
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            />
            <select
              name="status"
              value={editedJob.status}
              onChange={handleInputChange}
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-teal text-white rounded-md py-2 px-4"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-light text-gray-dark rounded-md py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
