import React from 'react';
import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl, __experimentalNumberControl as NumberControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { playerTypeOptions, skins } from '../../../../utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { BtnGroup, ColorControl, InlineDetailMediaUpload, Label } from '../../../../../../bpl-tools/Components';
import { playerTypeSwitch, skinSwitch } from '../../../../utils/functions';
import { BControlPro, ProAds } from '../../../../../../bpl-tools/ProControls';
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import ProNotice from '../../../../Panel/ProNotice/ProNotice';

const General = ({ attributes, setAttributes }) => {
    const { radioPlayer, radioStyles } = attributes;
    const { backgroundColor, playerWidth } = radioStyles;
    const { playerType, streamURL, playerPosition, stationName, welcomeMessage, autoPlay, initialVolume, artWork, showTime, skin, fetchNameFromUrl } = radioPlayer;


    return <>
        <PanelBody className='bPlPanelBody' title={__("Player", "streamcast")} >
            <SelectControl
                label={__("Radio Player Type:", "streamcast")}
                labelPosition='left'
                value={playerType}
                options={playerTypeOptions}
                onChange={(val) => setAttributes(playerTypeSwitch(val, attributes))}
            />

            {/* Minimal Settings */}
            {
                playerType === "minimal" && <>
                    <TextControl
                        help="If your site is secured ( https://) then the stream url must be secure (https://)"
                        label={__("Stream Source", "streamcast")}
                        value={streamURL}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamURL") })}
                    />

                    <ProNotice 
                        title={__("Get More with Premium Version", "streamcast")}
                        features={[
                            { name: "Player Position", desc: "Align player to Left, Center, or Right." }
                        ]}
                    />

                </>
            }

            {/* Standard Settings */}
            {
                playerType === "standard" && <>
                    <TextControl
                        help="If your site is secured ( https://) then the stream url must be secure (https://)"
                        label={__("Stream URL*", "streamcast")}
                        value={streamURL}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamURL") })}
                    />
                    <TextControl
                        label={__("Station Name*", "streamcast")}
                        value={stationName}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "stationName") })}
                    />
                    
                    <TextControl
                        className="mt20"
                        label={__("Welcome Message*", "streamcast")}
                        value={welcomeMessage}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "welcomeMessage") })}
                    />

                    <SelectControl
                        className="mt20"
                        label={__("Skins:", "streamcast")}
                        labelPosition='left'
                        value={skin.name}
                        options={skins}
                        onChange={(val) => setAttributes(skinSwitch(val, attributes))}
                    />

                    {
                        skin.name === "b_circle" && <UnitControl
                            label={__("Player Width", "streamcast")}
                            value={playerWidth}
                            units={[pxUnit(), perUnit()]}
                            onChange={(v) =>
                                setAttributes({
                                    radioStyles: updateData(radioStyles, v, "playerWidth")
                                })
                            }
                        />
                    }

                    <ProNotice 
                        title={__("Get More with Premium Version", "streamcast")}
                        features={[
                            {name: "Auto Play & Volume", desc: "Automatically start playing with preset volume."},
                            {name: "Fetch Name From URL", desc: "Get station name automatically from the stream."},
                            { name: "Player Position", desc: "Align player to Left, Center, or Right." }
                        ]}
                    />             
                </>
            }

            {/* Advance Settings */}
            {
                playerType === "advanced" && <>
                    <TextControl
                        help="If your site is secured ( https://) then the stream url must be secure (https://)"
                        label={__("Stream Source", "streamcast")}
                        value={streamURL}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamURL") })}
                    />
                    <TextControl
                        label={__("Station Name*", "streamcast")}
                        value={stationName}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "stationName") })}
                    />
                    <ToggleControl
                        className='mt20'
                        label='Fetch From URL'
                        checked={fetchNameFromUrl}
                        onChange={(e) => setAttributes({ radioPlayer: updateData(radioPlayer, e, "fetchNameFromUrl") })}
                        help="The welcome message won't be shown if you fetch the name from the URL."
                    />
                    <TextControl
                        className="mt10"
                        label={__("Welcome Message*", "streamcast")}
                        value={welcomeMessage}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "welcomeMessage") })}
                    /> 

                    <ProNotice 
                        title={__("Get More with Premium Version", "streamcast")}
                        features={[
                            { name: "Custom Artwork", desc: "Show beautiful station images." },
                            { name: "Show Time & BG Color", desc: "Display duration and customize colors." },
                            { name: "Full Control", desc: "Autoplay, Volume, and Metadata fetching included." },
                            { name: "Player Position", desc: "Align player to Left, Center, or Right." }
                            
                        ]}
                    />
                </>
            }

        </PanelBody>

        <ProAds/>
    </>;
}


export default General;