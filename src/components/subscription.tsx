import { useState } from 'react'
import type * as React from 'react'
import { styled } from 'twstyled'
import { useTheme } from '@/theme/hooks/use-theme'
import Section from '@/theme/components/section'
import { mediaqueries } from '@/theme/theme-tw'
import { Theme } from '@/theme/types'

const addToMailchimp = async (email: string) => {
  return { result: 'error' }
}

const Subscription: React.FC<{}> = () => {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    addToMailchimp(email)
      .then((data) => {
        if (data.result === 'error') {
          throw data
        }

        setSubscribed(true)
        setEmail('')

        setTimeout(() => {
          setSubscribed(false)
        }, 6000)
      })
      .catch((error) => {
        setError(error.msg)
      })
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value)
    setError('')
  }

  return (
    <Section className="narrow">
      <SubscriptionContainer>
        <Content>
          <Heading>
            Join our email list and get notified about new content
          </Heading>
          <Text>
            Be the first to receive our latest content with the ability to
            opt-out at anytime. We promise to not spam your inbox or share your
            email with any third parties.
          </Text>
          <Form theme={theme} onSubmit={handleSubmit} hasError={error}>
            <Input
              theme={theme}
              placeholder="your@email.com"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              hasError={error}
            />
            <Button
              type="submit"
              hasError={error}
              subscribed={subscribed}
              disabled={subscribed}
              theme={theme}
            >
              {subscribed ? <CheckMarkIcon /> : 'Subscribe'}
            </Button>
            {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
          </Form>
        </Content>
      </SubscriptionContainer>
    </Section>
  )
}

export default Subscription

const SubscriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 0 55px;
  margin: 10px auto 100px;
  background: var(--color-card);
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  z-index: 1;

  ${mediaqueries.tablet} {
    padding: 50px 0 0;
    text-align: center;
  }

  ${mediaqueries.phablet} {
    margin: -20px auto 80px;
  }
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;

  ${mediaqueries.tablet} {
    h3 {
      padding: 0 50px;
    }
  }

  ${mediaqueries.phone} {
    h3 {
      padding: 0 24px;
    }
  }
`

const Heading = styled.h3`
  word-break: keep-all;
  font-size: 24px;
  line-height: 1.45;
  font-weight: bold;
  color: var(--color-primary);
  font-family: var(--font-serif);

  ${mediaqueries.tablet} {
    font-size: 22px;
  }

  ${mediaqueries.phablet} {
    font-size: 20px;
  }
  margin-bottom: 20px;

  ${mediaqueries.tablet} {
    margin-bottom: 15px;
  }
`

const Text = styled.p`
  margin: 0 auto 30px;
  color: var(--color-grey);
  line-height: 1.75;

  ${mediaqueries.tablet} {
    padding: 0 26px;
    margin: 0 auto 25px;
  }
`

const Form = styled.form<{ hasError: string; theme: Theme }>`
  position: relative;

  &::after {
    content: '>';
    position: absolute;
    left: 21px;
    top: 10px;
    color: ${(p) =>
      p.hasError ? p.theme.colors.error : p.theme.colors.accent};

    ${mediaqueries.tablet} {
      left: 34px;
      top: 11px;
    }
  }
`

const Input = styled.input<{ hasError: string; theme: Theme }>`
  position: relative;
  background: ${(p) =>
    p.hasError
      ? p.theme.colors.errorBackground
      : p.theme.colors.inputBackground};
  border-radius: 35px;
  border: none;
  padding: 13px 21px 13px 35px;
  width: 471px;
  color: var(--color-primary);

  ::placeholder {
    color: var(--color-track);
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: var(--color-track);
  }

  ::-ms-input-placeholder {
    color: var(--color-track);
  }

  ${mediaqueries.tablet} {
    width: calc(100% - 36px);
    margin: 0 18px;
    padding: 14px 14px 14px 30px;
    margin-bottom: 30px;
  }
`

const Button = styled.button<{
  hasError: string
  subscribed: boolean
  theme: Theme
}>`
  position: absolute;
  left: 306px;
  top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  height: 38px;
  border: 1px solid
    ${(p) => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  color: ${(p) => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  background: ${(p) => (p.subscribed ? p.theme.colors.accent : 'transparent')};
  font-weight: 600;
  border-radius: 35px;
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad),
    background 0.2s var(--ease-in-out-quad), color 0.2s var(--ease-in-out-quad);

  &:hover {
    background: ${(p) =>
      p.hasError ? p.theme.colors.error : p.theme.colors.accent};
    color: var(--color-background);
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg * {
    fill: var(--color-background);
  }

  ${mediaqueries.tablet} {
    position: relative;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0;
    border-top: 1px solid var(--color-horizontal-rule);

    &:hover {
      color: initial;
      background: initial;
    }
  }
`

const Error = styled.div`
  position: absolute;
  left: 35px;
  bottom: -20px;
  color: var(--color-error);
  font-size: 12px;

  a {
    color: var(--color-error);
    text-decoration: underline;
  }

  ${mediaqueries.tablet} {
    left: 50px;
    top: 50px;
  }
`

const CheckMarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z"
      fill="#08080B"
    />
  </svg>
)
