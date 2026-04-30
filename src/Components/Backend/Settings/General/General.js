import React from 'react';
import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl, __experimentalNumberControl as NumberControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { playerTypeOptions, skins } from '../../../../utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { BtnGroup, ColorControl, InlineDetailMediaUpload, Label } from '../../../../../../bpl-tools/Components';
import { playerTypeSwitch, skinSwitch } from '../../../../utils/functions';
import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';

const General = ({ attributes, setAttributes, premiumProps }) => {
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
                    {/* <p className='mt20'>Player Position</p>
                    <BControlPro
                        value={playerPosition}
                        options={[
                            { label: "Left", value: "left" },
                            { label: "Center", value: "center" },
                            { label: "Right", value: "right" }
                        ]}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "playerPosition") })}
                        Component={BtnGroup}
                        {...premiumProps}
                    /> */}

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
                    {/* <BControlPro
                        className='mt20'
                        label='Fetch From URL'
                        checked={fetchNameFromUrl}
                        onChange={(e) => setAttributes({ radioPlayer: updateData(radioPlayer, e, "fetchNameFromUrl") })}
                        Component={ToggleControl}
                        {...premiumProps}
                        help="If the Fetch From URL is checked, use the station name from the stream URL if available; otherwise, use the name set above."
                    /> */}
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

                    {/* <BControlPro
                        className='mt20'
                        label='Auto Play'
                        checked={autoPlay}
                        onChange={(e) => setAttributes({ radioPlayer: updateData(radioPlayer, e, "autoPlay") })}
                        Component={ToggleControl}
                        {...premiumProps}
                    /> */}

                    {/* <BControlPro
                        className='mt20'
                        label='Initial Volume'
                        value={initialVolume}
                        onChange={(value) => setAttributes({ radioPlayer: updateData(radioPlayer, value, "initialVolume") })}
                        max={100}
                        min={0}
                        step={1}
                        Component={RangeControl}
                        {...premiumProps}
                    /> */}

                    {/* <p className='mt10'>Player Position</p>
                    <BControlPro
                        value={playerPosition}
                        options={[
                            { label: "Left", value: "left" },
                            { label: "Center", value: "center" },
                            { label: "Right", value: "right" }
                        ]}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "playerPosition") })}
                        Component={BtnGroup}
                        {...premiumProps}
                    /> */}
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


                    {/* <BControlPro
                        label={__("Background Color", "streamcast")}
                        value={backgroundColor}
                        onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "backgroundColor") })}
                        defaultColor="#f09f8b"
                        Component={ColorControl}
                        {...premiumProps}
                    /> */}

                    {/* <BControlPro
                        className="mt10"
                        label={__('Upload Art Work Image', 'streamcast')}
                        value={artWork}
                        types={['image']}
                        onChange={value => setAttributes({ radioPlayer: updateData(radioPlayer, value, "artWork") })}
                        placeholder={__('Upload Art Work Image', 'streamcast')}
                        Component={InlineDetailMediaUpload}
                        {...premiumProps}
                    /> */}

                    {/* <BControlPro
                        className='mt10'
                        label='Auto Play'
                        checked={autoPlay}
                        onChange={(e) => setAttributes({ radioPlayer: updateData(radioPlayer, e, "autoPlay") })}
                        Component={ToggleControl}
                        {...premiumProps}
                    /> */}
{/* 
                    <BControlPro
                        className='mt10'
                        label='Show Time'
                        checked={showTime}
                        onChange={(e) => setAttributes({ radioPlayer: updateData(radioPlayer, e, "showTime") })}
                        Component={ToggleControl}
                        {...premiumProps}
                    /> */}

                    {/* <p className='mt10'>Player Position</p>
                    <BControlPro
                        value={playerPosition}
                        options={[
                            { label: "Left", value: "left" },
                            { label: "Center", value: "center" },
                            { label: "Right", value: "right" }
                        ]}
                        onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "playerPosition") })}
                        Component={BtnGroup}
                        {...premiumProps}
                    /> */}

                </>
            }

        </PanelBody>
    </>;
}


export default General;