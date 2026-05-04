import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { updateData } from '../../../../../../bpl-tools/utils/functions'; 
import { playerTypeOptions } from '../../../../utils/options';
import { playerTypeSwitch } from '../../../../utils/functions';
import ProNotice from '../../../../Panel/ProNotice/ProNotice';

const SettingsXWooden = ({ setAttributes, attributes }) => {
    const { radioPlayer } = attributes; 
    const { streamURL, stationName, welcomeMessage, fetchNameFromUrl, playerType } = radioPlayer; 

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
                label={__("Stream URL", "streamcast")}
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
                help="If name can't access then will use the given station name"
            />
           
           <ProNotice 
                title={__("Get More with Premium Version", "streamcast")}
                features={[
                    { name: "Vintage Textures", desc: "Unlock premium wooden and classic textures." },
                    { name: "Hover Effects", desc: "Detailed control over interactive hover states." },
                    { name: "Timestamp Branding", desc: "Custom styling for timestamp and player metadata." }
                ]}
            />
        </>
    )
}

export default SettingsXWooden;
