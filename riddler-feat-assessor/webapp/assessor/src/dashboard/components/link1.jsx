import { React } from "react";
import { Link, useLocation } from "react-router-dom";

function Link1({ to, image, ch, title }) {
  const location = useLocation();

  /*
   * The Link will get parameters
   * to==path should be redirected or rendered in output
   * image==The image icon of the Link
   * ch== alternate work
   * The useLocation will let you know which page is rendered in the outlet and it gives page like '/home' or '/pagename'...
   * And we have to which is the path
   * So in classname we have option which when the current path equal to path(to) Then background will be gray
   * title displays when we hover over the icon
   */
  return (
    <div className="realtive flex group">
      <Link
        to={to}
        className={`p-1 rounded-full h-9 w-9 flex flex-col items-center justify-center hover:bg-dkgray ${
          location.pathname === to ? "bg-dkgray" : ""
        }`}
      >
        <img src={image} alt={ch} />
      </Link>
      <div className="absolute rounded-md px-1 border-ltblue border-2 bg-blue-200 text-dkblue font-semibold left-10 mt-5 hidden group-hover:block w-fit">
        {title}
      </div>
    </div>
  );
}

export default Link1;
