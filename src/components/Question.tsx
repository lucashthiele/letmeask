import '../styles/question.scss';
import { ReactNode } from 'react'
import className from 'classnames';
import { useTheme } from '../hooks/useTheme';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  const { theme } = useTheme();

  return (
    <div className={className(
      'question',
      { answered: isAnswered },
      { highlighted: isHighlighted },
      theme
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="" />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}