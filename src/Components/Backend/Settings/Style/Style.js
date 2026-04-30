import React from 'react';
import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import StyleXUltimate from './StyleXUltimate';
import StyleXEchoStreamXAurora from './StyleXEchoStreamXAurora';
import StyleXWooden from './StyleXWooden';


// Styles Settings For Ultimate & AuroraPlay Radio Player
const Style = ({ attributes, setAttributes, premiumProps }) => {
    const { radioPlayer } = attributes;
    const { playerType } = radioPlayer;
    return (
        <>
            <PanelBody className='bPlPanelBody' title={__("Player", "streamcast")}>

                {
                    playerType === "ultimate" && <StyleXUltimate attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
                }
                {
                    playerType === "echoStream" && <StyleXEchoStreamXAurora attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
                }
                {
                    playerType === "auroraPlay" && <StyleXEchoStreamXAurora attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
                }
                {
                    playerType === "wooden" && <StyleXWooden attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
                }

            </PanelBody>
        </>
    )
}


export default Style;