/**
 * Internal dependencies.
 */
import Card from '@/components/card/card';
import Stack from '@/components/stack/stack';

const Cards = () => {
    return (
        <div className="cards">
            <Stack direction="column" rowGap="20">
                <Card />
                <Card />
                <Card />
                <Card />
            </Stack>

        </div>
    );
};

export default Cards;
