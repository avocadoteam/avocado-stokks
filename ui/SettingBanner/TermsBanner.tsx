import { Box, Heading, Link, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Separator } from 'ui/atoms/Separator';
import { BlockedOutlineIcon } from 'ui/icons/BlockedOutlineIcon';
import { PaperOutlineIcon } from 'ui/icons/PaperOutlineIcon';
import { SettingCell } from 'ui/SettingCell';

export const TermsBanner = memo(() => {
  const { colors } = useTheme();
  return (
    <Box mt={3}>
      <Heading size={'sm'} color={colors.heading}>
        Terms
      </Heading>
      <Box>
        <SettingCell before={<BlockedOutlineIcon />}>
          <Link
            isUnderlined={false}
            _text={{ color: colors.headingSmall, fontWeight: 'bold', fontSize: 16 }}
            href="https://pages.flycricket.io/stokks-0/privacy.html"
          >
            Privacy Policy
          </Link>
        </SettingCell>
        <SettingCell before={<PaperOutlineIcon />}>
          <Link
            isUnderlined={false}
            _text={{ color: colors.headingSmall, fontWeight: 'bold', fontSize: 16 }}
            href="https://pages.flycricket.io/stokks-0/privacy.html"
          >
            Terms of Use
          </Link>
        </SettingCell>
      </Box>
      <Separator />
    </Box>
  );
});
