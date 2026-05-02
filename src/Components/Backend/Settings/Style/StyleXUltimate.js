import React from 'react';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';


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
    </>;
}


export default StyleXUltimate;