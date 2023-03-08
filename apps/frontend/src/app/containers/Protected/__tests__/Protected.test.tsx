import { render, screen } from '@testing-library/react';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { UserContext } from '../../../context/User/UserContext';
import Protected from '../Protected';

describe('Protected component', () => {
  test('renders children when accessToken is present', () => {
    const accessToken = 'testAccessToken';
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ accessToken }}>
          <Protected accessToken={accessToken}>
            <p>Protected content</p>
          </Protected>
        </UserContext.Provider>*
      </BrowserRouter>
    );
    const textElement = screen.getByText(/Protected content/i);
    expect(textElement).toBeInTheDocument();
  });

  // test('renders Navigate component when accessToken is not present', () => {
  //   const accessToken = "";
  //   render(
  //     <BrowserRouter>
  //       <UserContext.Provider value={{ accessToken }}>
  //         <Protected accessToken={accessToken}>
  //           <p>Protected content</p>
  //         </Protected>
  //       </UserContext.Provider>
  //     </BrowserRouter>
  //   );

  // });
});
