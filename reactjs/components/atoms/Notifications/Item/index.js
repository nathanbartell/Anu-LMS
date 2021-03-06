import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import xss from 'xss';
import striptags from 'striptags';
import { truncate } from '../../../../utils/string';

const NotificationItem = ({
  icon, date, title, text, isRead, className, onTitleClick, onItemClick,
}) => (
  <div
    className={`notifications-item ${className} ${!isRead ? 'not-read' : ''}`}
    onClick={onItemClick}
    onKeyPress={onItemClick}
  >
    <div className="header">
      {icon &&
        <div className="type-icon">{icon}</div>
      }

      <div className="date" title={moment(date, 'X').format('h:mma')}>
        <Moment parse="X" format="MMM Do">{date}</Moment>
      </div>
    </div>

    <div className="title">
      {/* @todo: We should cosider to use link if it leads to other page */}
      <span
        onClick={onTitleClick}
        onKeyPress={onTitleClick}
        dangerouslySetInnerHTML={{ __html: xss(title) }} // eslint-disable-line react/no-danger
      />
    </div>

    {text &&
      <div className="text">"{truncate(striptags(text), 200)}"</div> // eslint-disable-line react/no-unescaped-entities
    }
  </div>
);

NotificationItem.propTypes = {
  icon: PropTypes.node,
  date: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
  isRead: PropTypes.bool,
  onTitleClick: PropTypes.func,
  onItemClick: PropTypes.func,
};

NotificationItem.defaultProps = {
  icon: null,
  text: '',
  isRead: false,
  className: '',
  onTitleClick: () => {},
  onItemClick: () => {},
};

export default NotificationItem;
