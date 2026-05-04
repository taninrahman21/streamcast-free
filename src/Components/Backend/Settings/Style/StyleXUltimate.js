import React from 'react';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import ProNotice from '../../../../Panel/ProNotice/ProNotice';


const StyleXUltimate = ({ attributes, setAttributes }) => {
    const { radioStyles } = attributes;
    const { playerWidth } = radioStyles;


    return <>
        <UnitControl
            label={__("Player Width", "streamcast")}
            value={playerWidth}
            units={[pxUnit(), perUnit()]}
            onChange={(v) =>
                setAttributes({
                    radioStyles: updateData(radioStyles, v, "playerWidth")
                })
            }
        />

        <ProNotice 
            title={__("Advanced Styling for Ultimate", "streamcast")}
            features={[
                { name: "Station Name Typography", desc: "Full control over font size, weight, and color." },
                { name: "Visualizer Color", desc: "Customize the color of dynamic audio waves." },
                { name: "Custom CSS", desc: "Add your own CSS for ultimate design control." }
            ]}
        />
    </>;
}


export default StyleXUltimate;