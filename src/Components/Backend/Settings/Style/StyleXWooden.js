import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import { TabPanel, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { ColorControl, Typography } from '../../../../../../bpl-tools/Components';
import { tabController, updateData } from '../../../../../../bpl-tools/utils/functions';
import ProNotice from '../../../../Panel/ProNotice/ProNotice';

const StyleXWooden = ({ attributes, setAttributes }) => {
    const { radioStyles } = attributes;
    const { playerWidth, contentColor, stationName, timeStamp, backgroundColor } = radioStyles;

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

        <ColorControl
            label={__('Background Color', 'streamcast')}
            value={backgroundColor}
            onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "backgroundColor"), })}
            defaultColor='#ffffff'
        />

        <ColorControl
            label={__('Content Color', 'streamcast')}
            value={contentColor}
            onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "contentColor"), })}
            defaultColor='#ffffff'
        />

        <ProNotice 
            title={__("Get More with Premium Version", "streamcast")}
            features={[
                { name: "Station Name Typography", desc: "Detailed control over station name fonts." },
                { name: "Timestamp Style", desc: "Customize timestamp color and typography." },
                { name: "Custom Texture", desc: "Apply premium textures to the wooden player." }
            ]}
        />

    </>
}

export default StyleXWooden;