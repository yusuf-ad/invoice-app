import { useState } from "react";

function Modal() {
  const [isModalActive, setIsModalActive] = useState(true);

  return (
    <>
      <div
        className={`${
          isModalActive
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }  fixed inset-0 top-20 z-20 w-full transition-all duration-300 xl:top-0 xl:pl-28 dark:bg-skin-mirage2`}
      >
        <div
          className="center-xy absolute w-[480px] rounded-lg bg-white p-8 dark:bg-skin-mirage
        "
        >
          <h3 className="text-2xl font-bold tracking-wide text-skin-black">
            Confirm Deletion
          </h3>
          <p className="mt-4 text-sm leading-6 text-skin-shipCove">
            Are you sure you want to delete invoice{" "}
            <span className="text-xs">#</span>
            <span className="text-base">RT3080?</span> This action cannot be
            undone.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="btn-sm bg-skin-gray font-bold text-white  hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* overlay */}
      <div
        className={`${
          isModalActive
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } fixed inset-0 z-10 h-screen w-full bg-black/50 transition-opacity duration-100`}
      ></div>
    </>
  );
}

export default Modal;
