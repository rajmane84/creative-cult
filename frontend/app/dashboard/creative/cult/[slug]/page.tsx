'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Users,
  Crown,
  User,
  UserPlus,
  LogOut,
  Trash2,
  Calendar,
  Sparkles,
  Shield,
  Loader2,
} from 'lucide-react';
import { useCultDetail, useCultActions } from '@/hooks/creative/cult';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InviteMemberModal } from '@/components/creative/cult';

export default function CultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const { cult, isLoading, isError } = useCultDetail(slug);
  const {
    leaveCult,
    removeMember,
    updateMemberRole,
    disbandCult,
    isLeaving,
    isRemoving,
    isUpdatingRole,
    isDisbanding,
  } = useCultActions(cult?.id, slug);

  if (isLoading) {
    return (
      <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary selection:text-background selection:bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Loading cult details...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !cult) {
    return (
      <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex flex-col items-center justify-center space-y-4">
        <div className="flex size-14 items-center justify-center border border-border bg-card text-muted-foreground">
          <Sparkles className="size-6 text-primary selection:text-background selection:bg-primary" />
        </div>
        <h2 className="font-editorial text-3xl font-bold text-foreground">
          Cult not found
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          The requested collective does not exist or may have been disbanded.
        </p>
        <Button variant="outline" className="cursor-pointer gap-2">
          <Link href="/dashboard/creative/cult">
            <ArrowLeft className="size-4" />
            <span>Back to Cults</span>
          </Link>
        </Button>
      </div>
    );
  }

  const isLeader = cult.userRole === 'LEADER';
  const isMember = cult.userRole === 'MEMBER' || isLeader;

  const handleDisband = () => {
    if (
      confirm(
        `Are you sure you want to disband "${cult.name}"? This action cannot be undone.`
      )
    ) {
      disbandCult(undefined, {
        onSuccess: () => {
          router.push('/dashboard/creative/cult');
        },
      });
    }
  };

  const handleLeave = () => {
    if (!cult.userMembershipId) return;
    if (confirm(`Are you sure you want to leave "${cult.name}"?`)) {
      leaveCult(cult.userMembershipId, {
        onSuccess: () => {
          router.push('/dashboard/creative/cult');
        },
      });
    }
  };

  return (
    <div className="w-full bg-background">
      <div className="w-full max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-border bg-card p-6 sm:p-8 md:p-10 space-y-6 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-6">
              <Avatar className="size-16 sm:size-20 rounded-none border border-border bg-background shrink-0">
                {cult.avatarUrl && (
                  <AvatarImage src={cult.avatarUrl} alt={cult.name} />
                )}
                <AvatarFallback className="rounded-none font-editorial text-2xl font-bold text-primary selection:text-background selection:bg-primary">
                  {cult.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                    {cult.name}
                  </h1>

                  {cult.userRole && (
                    <Badge
                      className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider rounded-full border ${
                        isLeader
                          ? 'border-primary/40 bg-primary/10 text-primary selection:text-background selection:bg-primary font-semibold'
                          : 'border-border bg-muted text-muted-foreground'
                      }`}
                    >
                      {isLeader ? (
                        <Crown className="size-3 mr-1" />
                      ) : (
                        <User className="size-3 mr-1" />
                      )}
                      {isLeader ? 'Leader' : 'Member'}
                    </Badge>
                  )}
                </div>

                {cult.tagline && (
                  <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl">
                    {cult.tagline}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                    <span>
                      {cult.memberCount}{' '}
                      {cult.memberCount === 1 ? 'member' : 'members'}
                    </span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                    <span>
                      Established{' '}
                      {new Date(cult.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">#{cult.slug}</span>
                </div>
              </div>
            </div>

            {/* Leader / Member Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-border/40 w-full md:w-auto">
              {isLeader && (
                <>
                  <Button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="cursor-pointer gap-2 flex-1 md:flex-none"
                  >
                    <UserPlus className="size-4" />
                    <span>Invite Creative</span>
                  </Button>

                  <Button
                    onClick={handleDisband}
                    disabled={isDisbanding}
                    variant="destructive"
                    // className="cursor-pointer gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 flex-1 md:flex-none"
                  >
                    {isDisbanding ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    <span>Disband Cult</span>
                  </Button>
                </>
              )}

              {!isLeader && isMember && cult.userMembershipId && (
                <Button
                  onClick={handleLeave}
                  disabled={isLeaving}
                  variant="outline"
                  className="cursor-pointer gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 flex-1 md:flex-none"
                >
                  {isLeaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  <span>Leave Cult</span>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bio / Mission Section */}
        {cult.bio && (
          <div className="border border-border bg-card p-6 sm:p-8 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Sparkles className="size-3.5 text-primary selection:text-background selection:bg-primary" />
              <span>Collective Manifesto</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
              {cult.bio}
            </p>
          </div>
        )}

        {/* Members Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="size-3.5 text-primary selection:text-background selection:bg-primary" />
              <span>Active Roster ({cult.memberships?.length || 0})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {cult.memberships?.map((member) => {
              const memberUser = member.creativeProfile.user;
              const isTargetLeader = member.role === 'LEADER';

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between border border-border bg-card p-5 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar className="size-12 rounded-none border border-border bg-background shrink-0">
                      {memberUser.image && (
                        <AvatarImage
                          src={memberUser.image}
                          alt={memberUser.name}
                        />
                      )}
                      <AvatarFallback className="rounded-none font-editorial font-bold text-primary selection:text-background selection:bg-primary">
                        {memberUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-editorial text-lg font-bold text-foreground truncate">
                          {memberUser.name}
                        </h4>
                        {isTargetLeader && (
                          <Badge
                            variant="outline"
                            className="px-2 py-0 font-mono text-[9px] uppercase border-primary/40 text-primary selection:text-background selection:bg-primary shrink-0"
                          >
                            Leader
                          </Badge>
                        )}
                      </div>

                      {member.creativeProfile.headline && (
                        <p className="font-body text-xs text-muted-foreground truncate">
                          {member.creativeProfile.headline}
                        </p>
                      )}

                      <p className="font-mono text-[10px] text-muted-foreground">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Leader Controls over members */}
                  {isLeader &&
                    member.creativeProfileId !== cult.createdBy?.id && (
                      <div className="flex items-center gap-2 shrink-0">
                        {isTargetLeader ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isUpdatingRole}
                            onClick={() =>
                              updateMemberRole({
                                membershipId: member.id,
                                role: 'MEMBER',
                              })
                            }
                            className="font-mono text-[10px] uppercase h-8 px-2 cursor-pointer"
                            title="Demote to Member"
                          >
                            Demote
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isUpdatingRole}
                            onClick={() =>
                              updateMemberRole({
                                membershipId: member.id,
                                role: 'LEADER',
                              })
                            }
                            className="font-mono text-[10px] uppercase h-8 px-2 cursor-pointer text-primary selection:text-background selection:bg-primary"
                            title="Promote to Leader"
                          >
                            <Shield className="size-3 mr-1" />
                            Promote
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isRemoving}
                          onClick={() => {
                            if (
                              confirm(`Remove ${memberUser.name} from cult?`)
                            ) {
                              removeMember(member.id);
                            }
                          }}
                          className="h-8 px-2 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Remove Member"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isLeader && (
        <InviteMemberModal
          cultId={cult.id}
          cultSlug={cult.slug}
          cultName={cult.name}
          open={isInviteModalOpen}
          onOpenChange={setIsInviteModalOpen}
        />
      )}
    </div>
  );
}
