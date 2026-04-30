import React, { useState } from "react";
import { InspectorControls } from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { tabController } from "../../../../../bpl-tools/utils/functions";
import { AboutProModal } from "../../../../../bpl-tools/ProControls";
import { generalStyleTabs } from "../../../utils/options";
import General from "./General/General";
import { BBlocksAds } from "../../../../../bpl-tools/Components";
import GeneralTab from "./General/GeneralTab";
import Style from "./Style/Style";

const Settings = ({ attributes, setAttributes, isPremium }) => {
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const { radioPlayer } = attributes;
  const { playerType } = radioPlayer;

  const premiumProps = {
    isPremium,
    setIsProModalOpen,
  };

  return (
    <>
      <InspectorControls>
        {(playerType === "ultimate" ||
          playerType === "auroraPlay" ||
          playerType === "echoStream" ||
          playerType === "wooden") && (
          <TabPanel
            className="bPlTabPanel"
            activeClass="activeTab"
            tabs={generalStyleTabs}
            onSelect={tabController}
          >
            {(tab) => (
              <>
                {tab.name === "general" && (
                  <GeneralTab
                    attributes={attributes}
                    setAttributes={setAttributes}
                    premiumProps={premiumProps}
                  />
                )}

                {tab.name === "style" && (
                  <Style
                    attributes={attributes}
                    setAttributes={setAttributes}
                    premiumProps={premiumProps}
                  />
                )}
              </>
            )}
          </TabPanel>
        )}
        {playerType !== "ultimate" &&
          playerType !== "auroraPlay" &&
          playerType !== "echoStream" &&
          playerType !== "wooden" && (
            <General
              attributes={attributes}
              setAttributes={setAttributes}
              premiumProps={premiumProps}
            />
          )}
      </InspectorControls>

      <AboutProModal
        isProModalOpen={isProModalOpen}
        setIsProModalOpen={setIsProModalOpen}
        link={`/wp-admin/edit.php?post_type=streamcast&page=streamcast#/pricing`}
      >
        <li>
          &emsp;<strong>{__("Customized Radio Player: ", "streamcast")}</strong>
          {__("Customize You Player with some awesome options", "streamcast")}
        </li>
        <li>
          &emsp;<strong>{__("85+ Radio Skins: ", "streamcast")}</strong>
          {__(
            "Enhance your player using 85+ radio player skins.",
            "streamcast"
          )}
        </li>
        <li>
          &emsp;<strong>{__("Extensive Compatibility: ", "streamcast")}</strong>
          {__(
            "Works great with Shoutcast, Icecast, and other compatible streaming servers.",
            "streamcast"
          )}
        </li>
        <li>
          &emsp;<strong>{__("ShortCode Powered: ", "streamcast")}</strong>
          {__(
            "This plugin creates ShortCode for Each radio. So that you can play radio anywhere without coding.",
            "streamcast"
          )}
        </li>
        <li>
          &emsp;
          <strong>
            {__("Fetch Stream Title From Stream URL: ", "streamcast")}
          </strong>
          {__(
            "Collect Stream Name or Title or Artist Name from you streaming name.",
            "streamcast"
          )}
        </li>
        <li>
          &emsp;<strong>{__("Player Positioning: ", "streamcast")}</strong>
          {__("Alignment your player like left, center , right.", "streamcast")}
        </li>
        <li>
          &emsp;<strong>{__("Upload Image: ", "streamcast")}</strong>
          {__(
            "Set image for player background, player poster or art image.",
            "streamcast"
          )}
        </li>
      </AboutProModal>
    </>
  );
};
export default Settings;
