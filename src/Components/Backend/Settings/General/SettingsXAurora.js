import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react'
import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { BtnGroup, InlineDetailMediaUpload } from '../../../../../../bpl-tools/Components';
import { playerTypeOptions } from '../../../../utils/options';
import { playerTypeSwitch } from '../../../../utils/functions';

const SettingsXAurora = ({ setAttributes, attributes, premiumProps }) => {
    const { radioPlayer, radioStyles } = attributes;
    const { echoStream } = radioStyles;
    const { streamURL, playerPosition, stationName, welcomeMessage, fetchNameFromUrl, playerType, artWork } = radioPlayer;
    const { shareUrl } = echoStream;

    return (
        <>
            <SelectControl
                label={__("Radio Player Type:", "streamcast")}
                labelPosition='left'
                value={playerType}
                options={playerTypeOptions}
                onChange={(val) => setAttributes(playerTypeSwitch(val, attributes))}
            />
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
                help="If station name can't access from URL then will use the given station name"
            />

            <TextControl
                className="mt10"
                label={__("Artist/FM Name*", "streamcast")}
                value={welcomeMessage}
                onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "welcomeMessage") })}
            />

            {/* <BControlPro
                className="mt10"
                label={__('Upload Art Work Image', 'streamcast')}
                value={artWork}
                types={['image']}
                onChange={value => setAttributes({ radioPlayer: updateData(radioPlayer, value, "artWork") })}
                placeholder={__('Upload ArtWork Image', 'streamcast')}
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
        </>
    )
}

export default SettingsXAurora;
