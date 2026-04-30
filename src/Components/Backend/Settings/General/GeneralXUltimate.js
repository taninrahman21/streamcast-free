import React from 'react';
import { PanelBody, SelectControl, TextControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { playerTypeOptions } from '../../../../utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
// import { TextControlPro } from '../../../../../../bpl-tools';
import { Tab } from '../../../../Panel/Tab/Tab';
import { BtnGroup, InlineDetailMediaUpload } from '../../../../../../bpl-tools/Components';
import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import { playerTypeSwitch } from '../../../../utils/functions';

const GeneralXUltimate = ({ attributes, setAttributes, premiumProps }) => {
    const { radioPlayer, radioStyles } = attributes;
    const { ultimate } = radioStyles;
    const { playerBackgroundImg, posterImg } = ultimate;
    const { playerType, streamURL, playerPosition, stationName, streamProvider, streamPort, streamMountPoint, fetchNameFromUrl } = radioPlayer;



    return <>
        <SelectControl
            label={__("Radio Player Type:", "streamcast")}
            labelPosition='left'
            value={playerType}
            options={playerTypeOptions}
            onChange={(val) => setAttributes(playerTypeSwitch(val, attributes))}
        />

        <p className='mt20'>Stream Provider*</p>
        <Tab
            value={streamProvider}
            options={[
                { label: "SHOUT cast", value: "shout-cast" },
                { label: "Ice cast", value: "ice-cast" },
                { label: "Other", value: "other" }
            ]}
            onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamProvider") })}
        />

        <TextControl
            label={__("Stream Source", "streamcast")}
            value={streamURL}
            onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamURL") })}
        />

        {
            streamProvider !== "other" && <NumberControl
                className='mt10'
                label={__("Stream Port", "stramcast-block")}
                labelPosition='left'
                isShiftStepEnabled={true}
                onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamPort") })}
                shiftStep={1}
                value={streamPort}
            />
        }

        {
            streamProvider === "ice-cast" && <TextControl
                label={__("Stream Mount Point", "streamcast")}
                className='mt10'
                value={streamMountPoint}
                onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "streamMountPoint") })}
            />
        }

        <TextControl
            label={__("Station Name*", "streamcast")}
            className='mt10'
            value={stationName}
            onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "stationName") })}
        />
        <ToggleControl
            className='mt10'
            label='Fetch From URL'
            checked={fetchNameFromUrl}
            onChange={(e) => setAttributes({ radioPlayer: updateData(radioPlayer, e, "fetchNameFromUrl") })}
            help="If the Fetch From URL is checked, use the station name from the stream URL if available; otherwise, use the name set above."
        />

        {/* <BControlPro
            className="mt10"
            label={__('Poster Image', 'streamcast')}
            value={posterImg}
            types={['image']}
            onChange={value => setAttributes({ radioStyles: updateData(radioStyles, value, "ultimate", "posterImg") })}
            placeholder={__('Upload Poster Image', 'streamcast')}
            Component={InlineDetailMediaUpload}
            {...premiumProps}
        /> */}

        {/* <BControlPro
            className="mt10"
            label={__('Player Background Image', 'streamcast')}
            value={playerBackgroundImg}
            types={['image']}
            onChange={value => setAttributes({ radioStyles: updateData(radioStyles, value, "ultimate", "playerBackgroundImg") })}
            placeholder={__('Upload Player Background Image', 'streamcast')}
            Component={InlineDetailMediaUpload}
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
    </>;
}


export default GeneralXUltimate;