import { RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n'; 
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { playerTypeOptions } from '../../../../utils/options';
import { playerTypeSwitch } from '../../../../utils/functions';
import ProNotice from '../../../../Panel/ProNotice/ProNotice';

const SettingsXEchoStream = ({ setAttributes, attributes }) => {
    const { radioPlayer, radioStyles } = attributes;
    const { echoStream } = radioStyles;
    const { streamURL, stationName, welcomeMessage, fetchNameFromUrl, playerType } = radioPlayer;
    const { blur } = echoStream;

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

            <TextControl
                className="mt10"
                label={__("Artist/FM Name*", "streamcast")}
                value={welcomeMessage}
                onChange={(val) => setAttributes({ radioPlayer: updateData(radioPlayer, val, "welcomeMessage") })}
            />

            <RangeControl
                className='mt10'
                label={__("Blur", "streamcast")}
                value={blur}
                onChange={(value) => setAttributes({ radioStyles: updateData(radioStyles, value, "echoStream", "blur") })}
                max={100}
                min={0}
                step={1}
            />

            <ProNotice 
                title={__("Get More with Premium Version", "streamcast")}
                features={[
                    { name: "Poster Image", desc: "Set a stunning background poster." },
                    { name: "Visualizer", desc: "Add dynamic audio visual effects." },
                    { name: "Full Customization", desc: "Unlock all advanced styling and metadata options." }
                ]}
            />
        </>
    )
}

export default SettingsXEchoStream;
