import React from 'react';
import { TabPanel, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { ColorControl, Typography } from '../../../../../../bpl-tools/Components';
// import { ColorControl } from '../../../../../../Components';
import { __ } from "@wordpress/i18n";
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { tabController, updateData } from '../../../../../../bpl-tools/utils/functions';
import { BControlPro } from '../../../../../../bpl-tools/ProControls';


const StyleXEchoStreamXAurora = ({ attributes, setAttributes }) => {
    const { radioStyles, radioPlayer } = attributes;
    const { playerType } = radioPlayer;
    const { playerWidth, contentColor, backgroundColor } = radioStyles;


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
        {
            playerType === "auroraPlay" && <ColorControl
                label={__('Background Color', 'streamcast')}
                value={backgroundColor}
                onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "backgroundColor"), })}
                defaultColor='#ffffff'
            />
        }

        <ColorControl
            label={__('Content Color', 'streamcast')}
            value={contentColor}
            onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "contentColor"), })}
            defaultColor='#ffffff'
        />

        {/* {
            playerType === "echoStream" && <BControlPro
                label={__('Play Button Color', 'streamcast')}
                value={playBtnColor}
                onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "playBtnColor"), })}
                defaultColor='#ffffff'
                Component={ColorControl}
                {...premiumProps}
            />
        } */}






    </>;
}


export default StyleXEchoStreamXAurora;