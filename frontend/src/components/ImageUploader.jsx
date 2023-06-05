export default function ImageUploader({ uploadImages }) {
  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="multiple_files"
      >
        Upload multiple files
      </label>
      <input
        onChange={uploadImages}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="multiple_files"
        type="file"
        accept="image/png image/jpeg image/jpg image/webp"
        multiple
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        PNG, JPG, JPEG or Webp
      </p>
    </>
  );
}
