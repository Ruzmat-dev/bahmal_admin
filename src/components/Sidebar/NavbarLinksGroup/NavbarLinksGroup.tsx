import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { Link } from 'react-router-dom';

interface LinksGroupProps {
    icon: React.FC; // Use Record<string, never> for an empty object
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
    link: string
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links , link }: LinksGroupProps) {
    // console.log(link);
    
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Text<'a'>
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ));

    return (
        <Link to={link}>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0} px={15}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon color="lime" size={36}>
                            <Icon />
                        </ThemeIcon>
                        <Box ml="md"  className={classes.box}>{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </Link>
    );
}

const mockdata = {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
    ],
    link: "/"
};

export function NavbarLinksGroup() {
    return (
        <Box mih={220} p="md">
            <LinksGroup {...mockdata} />
        </Box>
    )
}