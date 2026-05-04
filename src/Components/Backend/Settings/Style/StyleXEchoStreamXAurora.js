import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { ColorControl } from '../../../../../../bpl-tools/Components';
import { __ } from "@wordpress/i18n";
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import ProNotice from '../../../../Panel/ProNotice/ProNotice';


const StyleXEchoStreamXAurora = ({ attributes, setAttributes }) => {
    const { radioStyles, radioPlayer } = attributes;
    const { playerType } = radioPlayer;
    const { playerWidth, contentColor, backgroundColor } = radioStyles;


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
        {
            playerType === "auroraPlay" && <ColorControl
                label={__('Background Color', 'streamcast')}
                value={backgroundColor}
                onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "backgroundColor"), })}
                defaultColor='#ffffff'
            />
        }

        <ColorControl
            label={__('Content Color', 'streamcast')}
            value={contentColor}
            onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "contentColor"), })}
            defaultColor='#ffffff'
        />

        <ProNotice 
            title={__("Get More with Premium Version", "streamcast")}
            features={[
                { name: "Advanced Colors", desc: "Separate color control for every small element of the player." },
                { name: "Hover Background", desc: "Option to change the background color on mouse hover." },
                { name: "Artist Typography", desc: "Customize fonts for artist names alongside station names." },
                { name: "Title Typography", desc: "Customize fonts for title alongside station names." }
            ]}
        />

    </>;
}


export default StyleXEchoStreamXAurora;
