import React, { useState } from "react";

const AddNewJobs = ({ setJobModal, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState("applied");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      jobTitle,
      companyName,
      applicationDate,
      status,
    };
    onAddJob(newJob);
    setJobTitle("");
    setCompanyName("");
    setApplicationDate("");
    setStatus("applied");
    setJobModal(false);
  };

  return (
    <div className="fixed inset-0 bg-[#000]/50 z-40">
      <div className="p-6 w-[70%] lg:w-[50%] shadow-md fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#f3f3f3] rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Job</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            />
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            />
            <input
              type="date"
              placeholder="Application Date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal"
              required
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-light rounded-md p-2 outline-none focus:ring-[1px] focus:ring-teal "
              required
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-teal text-white rounded-md py-2 px-4"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setJobModal(false)}
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

export default AddNewJobs;
