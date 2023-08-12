# Side bar

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import SideNav from "./SideNav";
const MainLayout = () => {
const [open, setOpen] = useState(true);

return (

<div className="flex">
<div
className={` ${
          open ? "w-64" : "w-0 "
        } bg-white h-screen duration-300 overflow-x-hidden`} >
<SideNav />
</div>
<div className="h-screen flex-1 bg-red-100">
{/_ Header _/}
<div className="h-[70px] bg-rose-500 flex items-center px-2">
<span className="text-2xl font-bold text-white cursor-pointer">
<AiOutlineMenu onClick={() => setOpen(!open)} />
</span>
</div>
</div>
</div>
);
};
export default MainLayout;

# Accordion

```js
const [active, setActive] = useState(false);
const handleActive = () => {
  setActive(!active);
};
<div
  className={` p-5 border border-[#c9c6c655] rounded-md w-[240px] group ${
    active ? "is-active" : ""
  } ${active ? "bg-white" : "bg-[#e9e9e9]"} duration-500`}
>
  <div className="flex items-center">
    <div className="w-full group-[.is-active]:font-bold">Whats your name ?</div>
    <div
      onClick={handleActive}
      className="text-xl rotate-90 group-[.is-active]:rotate-[270deg] duration-500 cursor-pointer"
    >
      >
    </div>
  </div>
  <div className="overflow-hidden max-h-0 group-[.is-active]:max-h-[100px] duration-500">
    My Name is Anamul
  </div>
</div>;
```
