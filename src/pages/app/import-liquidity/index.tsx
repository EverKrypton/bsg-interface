import { useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Text } from 'theme-ui';

import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { utils } from '../../../constants/token';
import { useAppContext } from '../../../context';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import usePairRoute from '../../../hooks/usePairRoute';
import { actions } from '../../../reducers';
import { useAppDispatch } from '../../../reducers/hooks';
import routes from '../../../routes';

export default function ImportLiquidityPage() {
  const { account } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const { toggleConnectWallet } = useAppContext();
  const navigate = useNavigate();

  const {
    disabledCurrency,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    currencies: { CURRENCY_A: currencyA, CURRENCY_B: currencyB },
  } = usePairRoute(['address0', 'address1']);

  const importPair = useCallback(() => {
    if (!currencyA || !currencyB) return;
    dispatch(
      actions.token.addSerializedPair({
        serializedPair: {
          token0: utils.toSerializedToken(currencyA.isNative ? currencyA.wrapped : currencyA),
          token1: utils.toSerializedToken(currencyB.isNative ? currencyB.wrapped : currencyB),
        },
      }),
    );
    navigate(routes.pool);
  }, [currencyA, currencyB, dispatch, navigate]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex
          sx={{
            flex: 1,
            marginBottom: 24,
            flexDirection: 'column',
          }}
        >
          <TokenPickerInput
            sx={{
              width: '100%',
              marginBottom: 12,
            }}
            label="Token 1"
            currency={currencyA}
            onClick={toggleSelectCurrencyA}
          />
          <TokenPickerInput
            sx={{
              width: '100%',
            }}
            label="Token 2"
            currency={currencyB}
            onClick={toggleSelectCurrencyB}
          />
        </Flex>

        <Button
          disabled={!currencyA || !currencyB}
          sx={{ background: 'linear-gradient(236.05deg, #18EBFB 9.43%, #D942FF 148.53%)' }}
          onClick={() => {
            if (!account) toggleConnectWallet();
            else importPair();
          }}
        >
          {!!account ? 'Import' : 'Connect to wallet'}
        </Button>
      </>
    );
  }, [account, currencyA, currencyB, importPair, toggleConnectWallet, toggleSelectCurrencyA, toggleSelectCurrencyB]);

  return (
    <>
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'dark.400',
          backgroundImage: `radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
      radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
      radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%)`,
          paddingY: 32,
        }}
      >
        <Flex sx={{ flexDirection: 'column', width: 512, maxWidth: '100vw' }}>
          <Button
            variant="buttons.link"
            sx={{ alignSelf: 'flex-start', marginX: 16, marginBottom: 16, color: 'white.400' }}
            onClick={() => {
              navigate(routes.pool);
            }}
          >
            <FiArrowLeft sx={{ width: '24px !important' }} />
            <Text
              sx={{
                fontSize: 32,
                lineHeight: '40px',
                fontWeight: '700',
                marginLeft: 12,
                ...mediaWidthTemplates.upToSmall({
                  variant: 'styles.h4',
                }),
              }}
            >
              Import Pool
            </Text>
          </Button>
          <Flex
            sx={{
              marginX: 16,
              paddingY: 24,
              flexDirection: 'column',
              backgroundColor: 'dark.500',
              borderRadius: 'lg',
              boxShadow: 'strong',
              paddingX: 24,
              ...mediaWidthTemplates.upToExtraSmall({
                paddingX: 16,
              }),
            }}
          >
            {renderContent()}
          </Flex>
        </Flex>
      </Flex>
      <SelectTokenModal
        active={isSelectingCurrency}
        title="Select token"
        disabledToken={disabledCurrency}
        onClose={onSelectCurrency}
      />
    </>
  );
}
