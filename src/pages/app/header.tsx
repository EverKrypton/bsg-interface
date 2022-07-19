import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Divider, Flex, Image, Text, Link as ELink } from 'theme-ui';

// import { ReactComponent as LogoSVG } from '../../assets/images/1.svg';
import { ReactComponent as LogoSVG } from '../../assets/images/logoblack.svg';
import BsgLogo from '../../assets/images/bsg.png';
import { ReactComponent as LogoROMASVG } from '../../assets/images/ro.svg';
import ConnectWalletButton from '../../components/buttons/connect-wallet.button';
import NavMenuButton from '../../components/buttons/nav-menu.button';
import Link from '../../components/links/link';
import { mediaWidthTemplates } from '../../constants/media';
import useMatchTab from '../../hooks/useMatchTab';
import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import routes from '../../routes';

export default function Header() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();

  const { matchedSwapRoute, matchedPoolRoute, matchedChartRoute } = useMatchTab();

  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const isUpToExtraExtraSmall = useMediaQueryMaxWidth('uptoExtraExtraSmall');
  const isUsingApp = pathname.indexOf(routes.swap) > -1 || pathname.indexOf(routes.pool) > -1;

  return (
    <Flex as="nav" sx={{ flexDirection: 'column', position: 'sticky', top: 0, zIndex: 10 }}>
      <Flex
        sx={{
          height: 80,
          width: '100%',
          backgroundColor: 'dark.400',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 48,
          ...mediaWidthTemplates.upToExtraSmall({
            paddingX: 16,
          }),
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Link
            variant="buttons.ghost"
            sx={{
              padding: 0,
              ':focus': { boxShadow: 'none' },
            }}
            to={'/'}
          >
            {/* {isUpToExtraSmall ? <LogoCircleSVG /> : <LogoSVG />} */}
            <Image
              src={BsgLogo}
              alt="BSG Logo"
              sx={{
                height: 40,
                width: 140,
                // ...mediaWidthTemplates.uptoExtraExtraSmall({
                //   height: 36,
                //   width: 105,
                // }),
                ...mediaWidthTemplates.upToExtraSmall({
                  height: 30,
                  width: 95,
                }),
              }}
            />
            {/* <LogoROMASVG /> */}
          </Link>
          {
            // <Text variant="caps101" sx={{ padding: 0 }}>
            //   BSGSWAP
            // </Text>
          }
          {!isUpToExtraSmall && (
            <Flex
              sx={{
                marginLeft: 12,
                backgroundColor: 'velvet.400',
                borderRadius: 40,
                paddingX: 10,
                height: 40,
              }}
            >
              <Link
                variant="buttons.ghost"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 40,
                  marginRight: 42,
                  height: 37,
                  alignContent: 'center',
                  alignSelf: 'center',
                  // backgroundColor: matchedSwapRoute ? 'linear-gradient(0deg, #ff0600 -50%, #ffb400 100%)' : 'dark.200',
                  color: matchedSwapRoute ? 'dark.400' : 'white.400',
                  backgroundColor: matchedSwapRoute ? 'mint.300' : 'dark.400',
                  ':focus': { boxShadow: 'none', color: 'dark.400', backgroundColor: 'mint.400' },
                }}
                to={routes.swapNext}
              >
                <Text sx={{ fontFamily: 'monospace' }}>{t('app:swap')}</Text>
              </Link>
              <Link
                variant="buttons.ghost"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 40,
                  marginRight: 42,
                  height: 37,
                  alignContent: 'center',
                  alignSelf: 'center',
                  color: matchedPoolRoute ? 'dark.400' : 'white.400',
                  backgroundColor: matchedPoolRoute ? 'mint.300' : 'dark.400',
                  ':focus': { boxShadow: 'none', color: 'dark.400', backgroundColor: 'mint.400' },
                }}
                to={routes.pool}
              >
                <Text sx={{ fontFamily: 'monospace' }}>{t('app:pool')}</Text>
              </Link>
              <ELink
                variant="buttons.ghost"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 40,
                  height: 37,
                  alignContent: 'center',
                  alignSelf: 'center',
                  color: matchedChartRoute ? 'dark.400' : 'white.400',
                  backgroundColor: matchedChartRoute ? 'mint.300' : 'dark.400',
                  ':focus': { boxShadow: 'none', color: 'dark.400', backgroundColor: 'mint.400' },
                }}
                href={routes.stake}
              >
                <Text sx={{ fontFamily: 'monospace' }}>{t('app:stake')}</Text>
              </ELink>
            </Flex>
          )}
        </Flex>
        <Flex
          sx={{
            marginLeft: 'auto',
            alignItems: 'center',
            '.menu-button': {
              display: 'none',
            },
            ...mediaWidthTemplates.upToExtraSmall({
              '.menu-button': {
                display: 'flex',
              },
            }),
          }}
        >
          {isUsingApp && <ConnectWalletButton />}
          <NavMenuButton className="menu-button" sx={{ marginLeft: '8px' }} />
        </Flex>
      </Flex>
      <Divider sx={{ borderColor: '#3C3F5A' }} />
    </Flex>
  );
}
