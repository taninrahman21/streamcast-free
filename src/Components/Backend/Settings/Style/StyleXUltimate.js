import React from 'react';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { BtnGroup, ColorControl } from '../../../../../../bpl-tools/Components';
// import { ColorControl } from '../../../../../../Components';
import { __ } from "@wordpress/i18n";
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { Tab } from '../../../../Panel/Tab/Tab';
import { BControlPro } from '../../../../../../bpl-tools/ProControls';


const StyleXUltimate = ({ attributes, setAttributes, premiumProps }) => {
    const { radioStyles, radioPlayer } = attributes;
    const { skin, playerType } = radioPlayer;
    const { playerWidth, ultimate } = radioStyles;
    const { playerOverlayColor, thumbnailBorderColor, contentColor, progressActiveColor, visualizerColor, playerColors, playerTheme } = ultimate;


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

        {/* <p className='mt10'>Player Colors</p>
        <Tab
            value={playerColors}
            options={[
                { label: "Theme", value: "theme" },
                { label: "Custom", value: "custom" }
            ]}
            onChange={(val) => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "playerColors") })}
        />
        {
            playerColors === "custom" ? <>
                <BControlPro
                    label={__('Player Overlay Color', 'streamcast')}
                    value={playerOverlayColor}
                    onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "playerOverlayColor"), })}
                    defaultColor='#ffffff'
                    Component={ColorControl}
                    {...premiumProps}
                />
                <BControlPro
                    label={__('Thumbnail Border Color:', 'streamcast')}
                    value={thumbnailBorderColor}
                    onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "thumbnailBorderColor"), })}
                    defaultColor='#ffffff'
                    Component={ColorControl}
                    {...premiumProps}
                />
                <BControlPro
                    label={__('Content Color:', 'streamcast')}
                    value={contentColor}
                    onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "contentColor"), })}
                    defaultColor='#ffffff'
                    Component={ColorControl}
                    {...premiumProps}
                />
                <BControlPro
                    label={__('Progress Active Color:', 'streamcast')}
                    value={progressActiveColor}
                    onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "progressActiveColor"), })}
                    defaultColor='#ffffff'
                    Component={ColorControl}
                    {...premiumProps}
                />
                <BControlPro
                    label={__('Visualizer Color:', 'streamcast')}
                    value={visualizerColor}
                    onChange={val => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "visualizerColor"), })}
                    defaultColor='#ffffff'
                    Component={ColorControl}
                    {...premiumProps}
                />
            </> : <>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <p style={{ marginBottom: 0, marginTop: "10px" }}>Player Themes</p>
                    {
                        !premiumProps.isPremium && <span style={{ padding: "2px 6px", marginLeft: "10px", color: "white", background: "rgb(68, 39, 163)", height: "max-content", borderRadius: "5px" }}>Pro</span>
                    }
                </div>
                <BControlPro
                    value={playerTheme}
                    options={[
                        { label: "Dodger Blue", value: "dodgerBlue" },
                        { label: "Bittersweet", value: "bittersweet" },
                        { label: "Light Sea Green", value: "lightSeaGreen" }
                    ]}
                    onChange={(val) => setAttributes({ radioStyles: updateData(radioStyles, val, "ultimate", "playerTheme") })}
                    Component={Tab}
                    {...premiumProps}
                />
            </>
        } */}
    </>;
}


export default StyleXUltimate;