import React from 'react'
import logo_blur from "../../dist/assets/img/logo_blur.png"
import icon_user from "../../dist/assets/img/icon_user.svg"
import icon_logout from "../../dist/assets/img/icon_logout.svg"

function Header() {
    return(
        <>
            <header className="border-b px-5 py-3">
                <div className="flex justify-between items-center">
                    <div className="w-[70px] h-[65px]">
                        <a href="">
                            <img src={logo_blur} alt="logo"/>
                        </a>
                    </div>
                    <div className="flex gap-5">
                        <button>
                            <img src="{logo_user}" alt=""/>
                        </button>
                        <button>
                            <img src="{logo_logout}" alt=""/>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header