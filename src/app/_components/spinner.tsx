import React from "react";
import cx from "classnames";

export interface SpinnerProps extends React.HTMLProps<HTMLDivElement> {
    full?: boolean,
    abs?: boolean,
};

const clsAnimateSpin = 'animate-[spin_0.5s_linear_infinite]';

export default React.forwardRef<HTMLDivElement, SpinnerProps>(
    function Spinner({ full, abs, className }: SpinnerProps, ref) {
        const containerCls = cx(full && 'w-full h-full', abs && 'absolute top-0 left-0 w-full h-full', className);
        const spinnerCls = cx(
            clsAnimateSpin, 'w-10 h-10',
            '!border-y-transparent !border-r-transparent',
            'rounded-full border-2 border-[#c64563]',
        );

        return (
            <div ref={ref} className={cx('flex items-center justify-center', containerCls)}>
                <div className={spinnerCls}/>
            </div>
        )
    }
);