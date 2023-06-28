import { render } from '@testing-library/react';

import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PageNotFound />);
        expect(baseElement).toBeTruthy();
    });
});
