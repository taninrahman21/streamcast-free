import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from "@wordpress/components";
import GeneralXUltimate from './GeneralXUltimate';
import SettingsXAurora from './SettingsXAurora';
import SettingsXEchoStream from './SettingsXEchoStream';
import SettingsXWooden from './SettingsXWooden';



// Component For Ultimate and AuroraPlay Radio General Settings
const GeneralTab = ({ attributes, setAttributes, premiumProps }) => {
    const { radioPlayer } = attributes;
    const { playerType } = radioPlayer;
    return <>
        <PanelBody className='bPlPanelBody' title={__("Player", "stream")}>
            {
                playerType === "ultimate" && <GeneralXUltimate attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
            }
            {
                playerType === "echoStream" && <SettingsXEchoStream attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
            }
            {
                playerType === "auroraPlay" && <SettingsXAurora attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
            }
            {
                playerType === "wooden" && <SettingsXWooden attributes={attributes} setAttributes={setAttributes} premiumProps={premiumProps} />
            }
        </PanelBody>
    </>
}


export default GeneralTab;