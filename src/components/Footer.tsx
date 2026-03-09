import { RiTwitterXFill } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";
import { GoFileDirectoryFill } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { LuCopyright } from "react-icons/lu";
import "../styles/components/footer.scss";

export const Footer = () => {
    const date = new Date();

    return (
        <footer id="footer">
            <div className="footer_top">
                <div className="footer_left">
                    <p className="f_title">
                        The bridge between your
                        <br />
                        money and the <span>world.</span>
                    </p>
                    <p className="f_desc">
                        Simple, trustworthy access to digital dollars — save,
                        invest, spend, and send, without ever needing to understand crypto.
                    </p>
                    <div className="footer_btns">
                        <a
                            href="https://wallet.riftfi.xyz/"
                            target="_blank"
                            className="f_btn primary"
                        >
                            Get Started
                        </a>
                        <a href="mailto:admin@riftfi.xyz" className="f_btn secondary">
                            Contact Us
                        </a>
                    </div>
                </div>

                <div className="footer_right">
                    <div className="footer_col">
                        <p className="col_title">Product</p>
                        <a href="#features">Features</a>
                        <a href="#forbusiness">For Business</a>
                        <a href="#howitworks">How It Works</a>
                        <a href="https://documentation.riftfi.xyz/" target="_blank">Documentation</a>
                    </div>
                    <div className="footer_col">
                        <p className="col_title">Connect</p>
                        <a href="mailto:admin@riftfi.xyz">admin@riftfi.xyz</a>
                        <a href="https://x.com/tryrift" target="_blank">X (Twitter)</a>
                        <a href="https://t.me/+B8abU5EjpTsyMWE8" target="_blank">Telegram</a>
                    </div>
                </div>
            </div>

            <div className="footer_bottom">
                <div className="social_icons">
                    <a href="https://x.com/tryrift" target="_blank" title="Rift on X">
                        <RiTwitterXFill />
                    </a>
                    <a href="https://t.me/+B8abU5EjpTsyMWE8" target="_blank" title="Telegram">
                        <SiTelegram />
                    </a>
                    <a href="https://documentation.riftfi.xyz/" target="_blank" title="Docs">
                        <GoFileDirectoryFill />
                    </a>
                    <a href="mailto:admin@riftfi.xyz" title="Email">
                        <HiOutlineMail />
                    </a>
                </div>
                <p className="copy">
                    <LuCopyright />
                    {date.getUTCFullYear()} Rift Finance. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
