"use client";

const WindowShell = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className="flex flex-col w-full rounded-t-[16px] outline outline-4 outline-[#ffffff33] bg-[#252527]">
      <div className="flex gap-[8px] h-[30px] items-center px-4">
        <div className="w-[12px] h-[12px] rounded-full bg-[#ED6D60]"></div>
        <div className="w-[12px] h-[12px] rounded-full bg-[#F6BF52]"></div>
        <div className="w-[12px] h-[12px] rounded-full bg-[#64C556]"></div>
      </div>
      {children}
    </div>
  );
};

export default WindowShell;
