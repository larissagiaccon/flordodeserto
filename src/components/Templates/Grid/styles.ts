import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: var(--default_showcase_mobile);
        grid-row-gap: 2rem;
    }
`
