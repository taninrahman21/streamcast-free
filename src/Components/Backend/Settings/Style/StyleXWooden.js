import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import { TabPanel, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { ColorControl, Typography } from '../../../../../../bpl-tools/Components';
import { tabController, updateData } from '../../../../../../bpl-tools/utils/functions';

const StyleXWooden = ({ attributes, setAttributes, premiumProps }) => {
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

    </>
}

export default StyleXWooden;