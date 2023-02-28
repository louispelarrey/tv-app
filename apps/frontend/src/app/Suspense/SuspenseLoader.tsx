import { Suspense } from 'react'
import styled from 'styled-components'

interface StyledSuspenseLoaderProps {
  children: JSX.Element
}

export const StyledSuspenseLoader = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    border-radius: 50%;
    zoom: 2;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3498db;
    animation: spin 0.6s infinite linear;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const SuspenseLoader = ({ children }: StyledSuspenseLoaderProps) => {
  return (
    <StyledSuspenseLoader>
      <Suspense fallback={<div className="loader"></div>}>
        {children}
      </Suspense>
    </StyledSuspenseLoader>
  )
}
