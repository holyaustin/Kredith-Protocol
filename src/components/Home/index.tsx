import { Text } from '@chakra-ui/react'
import { useAccount, useNetwork } from 'wagmi'
import { useTranslation } from 'next-i18next'
import { HeadingComponent } from '../Layouts/HeadingComponent'
import { useThemeModeManager } from '../../state/user/hooks'
import { useTokenBalances } from 'state/balances/hooks'
import { TOKENS } from '../../config/tokens'

const Home = () => {
  const { t } = useTranslation()
  const [userThemeMode] = useThemeModeManager()
  const walletBalances = useTokenBalances()
  const { address } = useAccount()
  const { chain } = useNetwork()
  return (
    <div>
      <main>
        <HeadingComponent as="h2">Kredith Protocol</HeadingComponent>
        <Text as="b" fontSize="24px">
          {
            'Critics of carbon accounting point to research suggesting that some carbon credits are not as green as they purport to be, with widely documented incidents of fraud, double-counting, and creative accounting rendering a large portion of carbon credits untrustworthy. It’s extremely difficult to quantify exactly how much CO2 a given project keeps out of the atmosphere, and poor quality credits have the potential to actively harm the environment by enabling companies to superficially offset their emissions whilst emitting more than they would have in the first place. Blockchain technology can record and transfer information flow reliably, realize point-to-point transactions between suppliers and demanders to achieve “decentralization”, and help to reduce the entry threshold for the carbon trading market. The role of data storage, collation, and accounting is the central technical approach for this project. Carbon credit purchase and offset will take center stage but funds that flow in can also be staked/farmed and compounded to increase the fund for decarbonization and reforestation exercises.'
          }
        </Text>
        <br /> <br />
        <Text fontSize="lg">Theme mode: {userThemeMode}</Text>
        <br />
        {address && chain ? (
          <>
            <Text fontSize="lg">Wallet address: {address}</Text>
            <Text fontSize="lg">Wallet Balance: </Text>

            {!chain.unsupported ? (
              TOKENS[chain?.id]?.map((token) => {
                return (
                  <Text fontSize="lg" key={token.address} color={'gray.500'}>
                    {token.symbol}: {walletBalances[token.symbol]}
                  </Text>
                )
              })
            ) : (
              <Text>Unsupported chain</Text>
            )}
          </>
        ) : (
          <Text fontSize="lg" as="b">
            Login to check your wallet balance
          </Text>
        )}
      </main>
    </div>
  )
}

export default Home
