import { useTheme, Box } from '@mui/material';
import { ComponentProps, useState } from 'react';
import { ContentWrapper, Navigation, Carousel, Card, Skeleton } from '../../components';
import { Sections } from '../../models';

import styles from './header.module.scss';

type HeaderProps = {
  onThemeToggle: ComponentProps<typeof Navigation>['onThemeToggle'];
  isDarkTheme: boolean;
  content?: Sections['headerSection'];
};

export const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkTheme, content }) => {
  const { palette } = useTheme();
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);

  return (
    <>
      <Navigation onThemeToggle={onThemeToggle} isDarkTheme={isDarkTheme} />
      <Box className={styles.headerWrapper} sx={{ backgroundColor: palette.primary.main }}>
        <ContentWrapper className={styles.headerContentWrapper}>
          <div className={styles.carouselSection}>
            <Carousel isHidden={isLoadingCarousel}>
              {content?.carouselPhotos.map((photo, index) => (
                <img onLoad={() => setIsLoadingCarousel(false)} key={index} src={photo.imageUrl} alt={photo.imageAlt} />
              ))}
            </Carousel>
            {isLoadingCarousel && <Skeleton variant="rectangular" height={290} />}
          </div>

          {content ? (
            <Card className={styles.textSection} contentClassName={styles.textSectionContent}>
              <>
                <Card title={content.firstArticle.title} className={styles.articleItem}>
                  {content?.firstArticle.content}
                </Card>
                <Card title={content.secondArticle.title} className={styles.articleItem}>
                  {content?.secondArticle.content}
                </Card>
              </>
            </Card>
          ) : (
            <Skeleton variant="rectangular" />
          )}
        </ContentWrapper>
      </Box>
    </>
  );
};
