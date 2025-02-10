const Errors = ({ errors }: { errors: string | string[] | undefined }) => {
  return (
    <div className="w-full">
      {errors && typeof errors === "string" && (
        <div className="flex flex-col justify-start my-2 items-start p-4 bg-rose-200 text-rose-500 rounded-2xl">
          <p>{errors}</p>
        </div>
      )}
      {errors && Array.isArray(errors) && (
        <div className="flex overflow-auto flex-col justify-start my-2 items-start p-4 bg-rose-200 text-rose-500 rounded-2xl">
          {errors.map((error: any, index) => {
            return (
              <p className="whitespace-nowrap" key={index}>
                <span className="font-bold">{error.path[0]}</span>: {error.message}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Errors;
