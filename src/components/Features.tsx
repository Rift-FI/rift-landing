import { GoRocket } from "react-icons/go";
import "../styles/components/features.scss";

export const Features = () => {
    return (
        <div id="features">
            <p className="title">
                Features <GoRocket />
            </p>

            <div className="title-desc">
                <p className="_title">
                    Three layers,
                    <br />
                    one simple app.
                </p>
                <p className="_desc">
                    Move between local currency and digital dollars in seconds. Then save, invest, spend,
                    and send — all from one place. The blockchain is invisible. You just see your money, working for you.
                </p>
            </div>

            <div className="__features">
                <div className="f_left">
                    <p className="f_title">The Ramp: In and Out</p>
                    <p className="f_desc">
                        Add money in Naira, KES, or GHS via bank transfer, mobile money, or card.
                        Get USDC instantly. Reverse anytime. The crypto is invisible.
                    </p>

                    <div className="f_bg_image" />
                </div>

                <div className="f_right">
                    <div className="feature">
                        <span>
                            <p className="f_title">Dollar Savings & Yield</p>
                            <p className="f_desc">
                                Hold your money in USDC. Earn yield on your balance automatically.
                                Your dollars work while you sleep — no staking, no complexity.
                                <br />
                            </p>
                        </span>

                        <div className="f_bg_image crossborder" />
                    </div>

                    <div className="feature">
                        <span>
                            <p className="f_title">Invest & Spend Globally</p>
                            <p className="f_desc">
                                Buy fractional US stocks from $10. Get a virtual card to spend
                                anywhere. Send money globally — they receive local currency.
                                <br />
                            </p>
                        </span>

                        <div className="f_bg_image insights" />
                    </div>
                </div>
            </div>
        </div>
    );
};
