import { RiTwitterXFill } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";
import { GoFileDirectoryFill } from "react-icons/go";
import { LuCopyright } from "react-icons/lu";
import "../styles/components/footer.scss";

export const Footer = () => {
    const date = new Date();

    return (
        <footer id="footer">
            <p className="f_title">
                Ready to See
                <br />
                Money Differently.
            </p>
            <p className="f_desc">
                Join us as we revolutionize how we
                <br />
                we save, spend & grow wealth.
            </p>

            <div className="links">
                <a href="https://x.com/tryrift" target="_blank">
                    <RiTwitterXFill />
                </a>

                <a href="https://t.me/+B8abU5EjpTsyMWE8" target="_blank">
                    <SiTelegram />
                </a>

                <a href="https://documentation.riftfi.xyz/" target="_blank">
                    <GoFileDirectoryFill />
                </a>
            </div>

            <p className="copy">
                <LuCopyright />
                {date.getUTCFullYear()} Rift Finance. All rights reserved.
            </p>
        </footer>
    );
};
