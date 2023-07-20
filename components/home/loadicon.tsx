import React from "react";
import Image from "next/image";


function loadicon() {
    return <>
            <Image
              src="/test.gif"
              alt="N17R logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
    </>
}

export default loadicon;